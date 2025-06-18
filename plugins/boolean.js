export default function(probability) {
  if (typeof probabilty === 'string') {
    probability = parseFloat(probability)
  }
  if (!probability || probability < 0) {
    probability = 0.5
  }
  return (Math.random() <= probability) ? 'true' : 'false'
}
