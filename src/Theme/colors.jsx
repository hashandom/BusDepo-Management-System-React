
export default function getColor(color) {
    switch (color) {
        case "colorTableHeaderBG":
            return "rgba(25, 118, 210, 1)"
            break;
        case "colorTableHeaderFG":
            return "white"
            break;
    
        default:
            return "black"
            break;
    }
}
