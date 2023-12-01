import getConfig from 'next/config';
import mongoose, { Schema, Document, Model } from 'mongoose';

const { serverRuntimeConfig } = getConfig();

mongoose.connect(process.env.MONGODB_URL || serverRuntimeConfig.connectionString, {
    //@ts-ignore
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

interface UserAttributes {
  username: string;
  hash: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserDocument extends UserAttributes, Document {
  toJSON(): any;
}

interface UserModel extends Model<UserDocument> {
  save(user: UserAttributes): Promise<UserDocument>;
}

export const db = {
  User: userModel(),
};

function userModel(): Model<UserDocument> {
  const schema = new Schema<UserDocument>(
    {
      username: { type: String, unique: true, required: true },
      hash: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );

  schema.statics.save = async function (user: UserAttributes): Promise<UserDocument> {
    return this.create(user);
  };

  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
      // delete ret.hash;
    },
  });

  return mongoose.models.User || mongoose.model<UserDocument>('User', schema);
}
