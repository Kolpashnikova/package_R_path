function colorsNeeded(activity) {

    var mainColors = {

        'Sleep': [
            [58, 118, 175],
            [83, 140, 198],
            [32, 64, 96]]
        ,

        'Personal Care': [
            [178, 199, 229],
            [197, 213, 235],
            [121, 157, 210]]
        ,

        'Housework': [
            [239, 133, 54],
            [245, 176, 125],
            [201, 95, 16]]
        ,

        'Child Care': [
            [245, 189, 130],
            [251, 226, 201],
            [239, 152, 59]]
        ,

        'Adult Care': [
            [82, 157, 62],
            [121, 194, 101],
            [53, 102, 40]]
        ,

        'Work': [
            [168, 220, 147],
            [199, 232, 186],
            [121, 201, 89]]
        ,

        'Shopping': [
            [197, 57, 50],
            [241, 204, 202],
            [136, 39, 35]]
        ,

        'TV Watching': [
            [241, 157, 153],
            [250, 222, 220],
            [232, 92, 86]]
        ,

        'Eating': [
            [141, 107, 184],
            [181, 159, 209],
            [103, 70, 145]]
        ,

        'Leisure': [
            [193, 177, 210],
            [232, 226, 238],
            [154, 128, 182]]
        ,

        'Travel': [
            [133, 88, 78],
            [173, 125, 115],
            [85, 56, 50]]

    };

    return mainColors[activity];
}

// (kk) additional functions to translate rgb colors into hex
function rgbToHex(rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) { hex = "0" + hex; }
    return hex;
};

function fullColorHex(arr) {
    var red = rgbToHex(arr[0]);
    var green = rgbToHex(arr[1]);
    var blue = rgbToHex(arr[2]);
    return red+green+blue;
};
