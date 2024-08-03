import { compare, hash } from "bcrypt";
import { Model, model, ObjectId, Schema } from "mongoose";

interface EmailVerificationToken {
  owner: ObjectId;
  token: string;
  createdAt: Date;
}

interface Methods {
  compareToken(token: string): Promise<boolean>;
}

const emailVerificationTokenSchema = new Schema<
  EmailVerificationToken,
  {},
  Methods
>({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: Schema.Types.String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  },
});

emailVerificationTokenSchema.pre("save", async function (next) {
  if (this.isModified("token")) {
    this.token = await hash(this.token, 10);
    next();
  }
});

emailVerificationTokenSchema.methods.compareToken = async function (token) {
  return await compare(token, this.token);
};

export default model(
  "EmailVerificationToken",
  emailVerificationTokenSchema
) as Model<EmailVerificationToken, {}, Methods>;
