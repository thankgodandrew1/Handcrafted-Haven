import getConfig from 'next/config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Document, Model, Schema } from 'mongoose'
import { db } from './db'

const { serverRuntimeConfig } = getConfig()
const User = db.User

interface UserAttributes {
  email: string
  hash: string
  token?: string
  // Add other properties as needed
}

interface UserDocument extends UserAttributes, Document {
  toJSON(): any
}

interface UserModel extends Model<UserDocument> {
  saveUser(user: UserAttributes): Promise<UserDocument>
}

export const usersRepo = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
}

async function authenticate({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<{ token: string } & UserAttributes> {
  const user: UserDocument | null = await User.findOne({ email })

  if (!(user && bcrypt.compareSync(password, user.hash))) {
    throw new Error('password is incorrect')
  }

  // create a jwt token that is valid for 7 days
  const token: string = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, {
    expiresIn: '7d',
  })

  return {
    ...user.toJSON(),
    token,
  }
}

async function getAll(): Promise<UserAttributes[]> {
  const users: UserDocument[] = await User.find()
  return users.map((user) => user.toJSON())
}

async function getById(id: string): Promise<UserAttributes | null> {
  const user: UserDocument | null = await User.findById(id)
  return user ? user.toJSON() : null
}

async function create(params: {
  email: string
  password: string
}): Promise<void> {
  // validate
  if (await User.findOne({ email: params.email })) {
    throw new Error(`Email "${params.email}" is already used`)
  }

  const user: UserDocument = new User(params)

  // hash password
  if (params.password) {
    user.hash = bcrypt.hashSync(params.password, 10)
  }

  // save user
  await user.save()
}

async function update(
  id: string,
  params: { email: string; password: string },
): Promise<void> {
  const user: UserDocument | null = await User.findById(id)

  // validate
  if (!user) {
    throw new Error('User not found')
  }

  if (
    user.email !== params.email &&
    (await User.findOne({ email: params.email }))
  ) {
    throw new Error(`Email "${params.email}" is already used`)
  }

  // hash password if it was entered
  if (params.password) {
    user.hash = bcrypt.hashSync(params.password, 10)
  }

  // copy params properties to user
  Object.assign(user, params)

  await user.save()
}

async function _delete(id: string): Promise<void> {
  await User.findByIdAndDelete(id)
}
