declare module 'classnames' {
  // LICENSE is MIT
  //
  // Copyright (c) 2018
  //   Dave Keen <http://www.keendevelopment.ch>
  //   Adi Dahiya <https://github.com/adidahiya>
  //   Jason Killian <https://github.com/JKillian>
  //   Sean Kelley <https://github.com/seansfkelley>
  //   Michal Adamczyk <https://github.com/mradamczyk>
  //   Marvin Hagemeister <https://github.com/marvinhagemeister>
  // TypeScript Version: 3.0

  export type Value = string | number | boolean | undefined | null
  export type Mapping = Record<string, unknown>
  export type Argument = Value | Mapping | Array<Argument>
  export default function cx(...args: Array<Argument>): string
}
