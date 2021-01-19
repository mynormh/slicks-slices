const sizes = {
  S: 0.075,
  M: 1,
  L: 1.25,
};

export default function calculatePizzaPrice(cents, size) {
  return cents * sizes[size];
}
