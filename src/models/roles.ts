import { model, Schema } from "mongoose";

export interface IRole {
  name: string;
  description: string;
  authorizations: Authorization[];
}

export interface Authorization {
  permissions: Permissions;
  ressource: string;
}

export interface Permissions {
  full: string[];
}

// 2. Create a Schema corresponding to the document interface.
const roleSchema = new Schema<IRole>({
  name: { type: String },
  description: { type: String },
  authorizations: [{
    permissions: {
      full: [{ type: String }],
    },
    ressource: { type: String },
  }],

});

// 3. Create a Model.
const Role = model<IRole>("roles", roleSchema);

export { Role };
