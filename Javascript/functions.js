function arrayFill(length, value = 0) {
  const r = []; 
  for(let i = 0; i < length; i++) {
    r[i] = value;
  }
  return r
}
