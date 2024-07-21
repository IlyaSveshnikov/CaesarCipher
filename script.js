function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
  }


function decrypt(text, key) {
    let left_edge = 97;
    let right_edge = 122;
    let res = "";
    let s, char;

    for (let i = 0; i < text.length; i++) {
        char = text[i].toLowerCase();
        if (char.codePointAt(0) - key < left_edge && isLetter(char)) {
            s = String.fromCodePoint(right_edge - (key - (char.codePointAt(0) - left_edge)) + 1);
        } 
        else {
            if (isLetter(char)) {
                s = String.fromCodePoint(char.codePointAt(0) - key);
            } 
            else {
                res += char;
                continue
            }
        }
        if (text[i] == char.toUpperCase()) {
            res += s.toUpperCase();
        }
        else {
            res += s
        }
    }

    return res
}


function encrypt(text, key) {
    let left_edge = 97;
    let right_edge = 122;
    let res = "";
    let s, char;

    for (let i = 0; i < text.length; i++) {
        char = text[i].toLowerCase();
        if (char.codePointAt(0) + key > right_edge && isLetter(char)) {
            s = String.fromCodePoint(left_edge + (key + (char.codePointAt(0) - right_edge)) - 1);
        } 
        else {
            if (isLetter(char)) {
                s = String.fromCodePoint(char.codePointAt(0) + key);
            } 
            else {
                res += char;
                continue
            }
        }
        if (text[i] == char.toUpperCase()) {
            res += s.toUpperCase();
        }
        else {
            res += s
        }
    }

    return res
}


function update_result(is_encrypting) {
    const text = document.getElementById("message").value;
    const key = parseInt(document.getElementById("key").value);

    if (isNaN(key)) {
        document.getElementById("key").value = "Enter a number";
        document.getElementById("key").style.color = "red";
        return;
    } 
    else {
        if (key > 26 || key < 1) {
            document.getElementById("key").value = "Number must be from 1 to 26";
            document.getElementById("key").style.color = "red";
            return;
        }
        else {
            document.getElementById("key").style.color = "#757575";
        }
    }

    let res = "";

    if (is_encrypting) {
        res = encrypt(text, key);
    }
    else {
        res = decrypt(text, key);
    }

    document.getElementById("result").textContent = res;
}


// Event listeners to buttons
document.getElementById("enc-btn").addEventListener("click", 
function () {
    update_result(true);
})

document.getElementById("dec-btn").addEventListener("click", 
function () {
    update_result(false);
})

