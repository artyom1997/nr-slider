export default function createLeftMovementType(
    width,
    blockCount,
    length,
    prev,
    position
  ) {
    let type = "";
    if (position === "center") {
      if (prev >= (width / blockCount) * ((blockCount - 1) / 2)) {
        type = "end";
      } else {
        type = "move";
      }
    }
    if (position === "start") {
      if (prev >= 0) {
        type = "goStart";
      } else if (prev + width >= 0) {
        type = "end";
      } else {
        type = "move";
      }
    }
    return type;
  }
  