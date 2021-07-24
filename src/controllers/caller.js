module.exports.caller = (min, max, calls) => {
  while (true) {
    const call = Math.floor(Math.random() * (max - min + 1) + min)

    if (calls.includes(call)){
      continue
    }

    return call
  }
}