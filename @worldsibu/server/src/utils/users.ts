import * as x509 from 'x509';
import { join } from 'path';
import * as fs from 'fs';

export namespace Users {
  export function GetUsers(list: { org: string, user: string, name: string }[]): {
    org: string,
    user: string,
    id: string,
    ref: string,
    name: string
  }[] {
    let res: {
      org: string,
      user: string,
      id: string,
      ref: string,
      name: string
    }[] = [];
    for (let item of list) {
      let cert =
        JSON.parse(
          fs.readFileSync(`../../.convector-dev-env/.hfc-${item.org}/${item.user}`
            , 'utf8')).enrollment.identity.certificate;
      let certParsed = x509.parseCert(cert);

      res.push({
        org: item.org, user: item.user, id: certParsed.fingerPrint,
        ref: `${item.org}:${item.user}`, name: item.name
      });
    }
    return res;
  }
}
