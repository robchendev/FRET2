import { config } from "../config/config";
import { secrets } from "../config/secrets";
import { flux as dev } from "../config/flux.dev";
import { flux as prod } from "../config/flux.prod";

type FluxConfig = {
  moderatorRoleId: string;
  everyoneRoleId: string;
  DBmanager: string;
  shareMusicChannel: string;
  helpForumChannel: string;
  impersonateChannel: string;
  weeklyChannel: string;
};

export class configHandler {
  production = false; // edit this
  flux: FluxConfig | undefined = undefined;
  config = config;
  secrets = secrets;
  init = () => {
    if (this.production) this.flux = prod;
    else this.flux = dev;
  };
}
