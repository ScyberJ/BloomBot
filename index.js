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

const string = `AIChatBot: I am happy to help you out! When is your birthday?

Since I am still a beginner, this feels like a lousy chatbot. What should I do to improve it?`

const matcher = new RegExp(/.*:{1}.*[?!.]{1,2}/, "g")
console.log(string.includes(`AIChatBot:`))
console.log('the result of match:' + string.match(matcher))
console.log('the result of test:' + matcher.test(string))