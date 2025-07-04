export function removeUndefinedAndNull(obj: any) {
  const newObj: any = {};

  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null && obj[key].length !== 0) {
      newObj[key] = obj[key];
    }
  }

  return newObj;
}
