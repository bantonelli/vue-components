let prop = "name";
let model = {
    name: "Field",
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: ''
};

function getPropByPath(obj, path) {
    // obj == model (the object that contains all form-item props)
    // path == the string of the prop to validate 
    let tempObj = obj;

        // console.log("Before first replace: ", path);
    // Replace all alphanumeric characters in path string   
    path = path.replace(/\[(\w+)\]/g, '.$1');
        // console.log("After first replace: ", path);
    path = path.replace(/^\./, '');
        // console.log("After second replace: ", path);

    var randomString = "stuff[otherstuff]".replace(/\[(\w+)\]/g, '.$1');    
    console.log(randomString);

    randomString = ". Stifk{addf adkfjlaksdj".replace(/^\./, '');
    console.log(randomString);

    var randomArray = "stuff.path".split('.');
    console.log(randomArray);
    

    let keyArr = path.split('.');
    let i = 0;

    for (let len = keyArr.length; i < len - 1; ++i) {
        let key = keyArr[i];
        if (key in tempObj) {
        tempObj = tempObj[key];
        } else {
        throw new Error('please transfer a valid prop path to form item!');
        }
    }
    return {
        o: tempObj,
        k: keyArr[i],
        v: tempObj[keyArr[i]]
    };
}

var path = prop;

// If path has a colon replace it with a . 
if (path.indexOf(':') !== -1) {
    path = path.replace(/:/, '.');
}

// Pass model (the object that contains all form-item props)
// Pass path (the string of the prop to validate)           
console.log(getPropByPath(model, path).v);
