function areExcluded(key: string | symbol, excludedProps: string[]): boolean {
  // console.log("Evaluating the key: ", key)
  let excluded: boolean = false;
  excludedProps.forEach((excludedProp) => {
    if (key === excludedProp) {
      excluded = true;
    }
  });
  return excluded;
}

export function getTypesOfObject(
  object: object,
  excludedProps: string[],
): { propertyKey: string | symbol; propertyType: string }[] {
  /* todo : think in a better way to handle the excluded propertyValues like arrays
         maybe this will be solved creating a symbol to marks an object as array,
          provided that are an a really array
     */
  const keys = Reflect.ownKeys(object);
  const outputArray: { propertyKey: string | symbol; propertyType: string }[] =
    [];
  keys.forEach((key) => {
    const value = object[key];
    const typeProp = typeof value;
    if (!areExcluded(key, excludedProps)) {
      outputArray.push({
        propertyKey: key,
        propertyType: typeProp,
      });
    }
  });
  return outputArray;
}
