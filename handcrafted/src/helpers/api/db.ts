import getConfig from 'next/config';
import mongoose, { Schema, Document, Model } from 'mongoose';

const { serverRuntimeConfig } = getConfig();

mongoose.connect( serverRuntimeConfig.connectionString || "mongodb+srv://thankgodandrew663:xVJYcLzDDrnybFzo@cluster0.qwzwy2h.mongodb.net/HandcraftedHaven?retryWrites=true&w=majority", {
    //@ts-ignore
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

interface UserAttributes {
  firstName: string;
  lastName: string;
  email: string;
  hash: string; 
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
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, unique: true, required: true },
      hash: { type: String, required: true },
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
      delete ret.hash;
    },
  });

  return mongoose.models.User || mongoose.model<UserDocument>('User', schema);
}
