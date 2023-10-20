export const arrayToQueryString = (arr, field) => {
    const string = arr.join(",").replace(/,/gi, " or ")
    const finalQuery = `${string} in ${field}`
    return string
  }

export const arrayToWhereString = (arr) => {

  const filteredArr = arr.filter(str => str !== "")

  const string = filteredArr.join(",").replace(/,/gi, " or ")

  return string
}