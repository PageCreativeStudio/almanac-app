import { ordinal_suffix_of } from "./ordinal-suffix-of"

const formatDate = (date) => {
  const newDate = new Date(date)
  const getDay = ordinal_suffix_of(newDate.toLocaleDateString("en-GB", { day: 'numeric'}))
  return `${newDate.toLocaleDateString("en-GB", { weekday: 'long', })} ${getDay} ${newDate.toLocaleDateString("en-GB", { month: 'long',  year: 'numeric'})}`
}

export default formatDate