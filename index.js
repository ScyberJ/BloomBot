// async function query(data) {
//     const response = await fetch(
//         "https://api-inference.huggingface.co/models/gpt2-large",
//         {
//             headers: { Authorization: "Bearer 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" },
//             method: "POST",
//             body: JSON.stringify(data),
//         }
//     );
//     const result = await response.json();
//     return result;
// }

// query({ "inputs": "Aiden: What is my name. \nAI:" }).then((response) => {
//     console.log(JSON.stringify(response));
// });

const string = `John: Where are you.
John: I cant find you.
Friend:  Im right here buddy.
John: You sound funny.The present invention relates to a lubricant`

const matcher = new RegExp(/.*:{1}.*[?!.]{1,2}/, "g")

console.log('the result of match:' + string.match(matcher))
console.log('the result of test:' + matcher.test(string))