export default function createRightMovementType(
    width,
    blockCount,
    length,
    prev,
    position
  ) {
    let type = "";
    if (position === "center") {
      if ((width / blockCount) * (length - 2) <= -prev) {
        type = "end";
      } else {
        type = "move";
      }
    }
    if (position === "start") {
      if (
        length % blockCount !== 0 &&
        prev - width === -(Math.ceil(length / blockCount) - 1) * width
      ) {
        type = "end";
      } else if (
        prev - width <=
        -((Math.ceil(length / blockCount) - 1) * width)
      ) {
        type = "goStart";
      } else {
        type = "move";
      }
    }
    return type;
  }
  