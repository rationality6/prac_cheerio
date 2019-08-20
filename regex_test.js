
const result = `

9234739     

`
console.log(result, 'done')
result.replace(/\s\s+/g, '')

console.log(result)


const string_ex00 = `
1 HTML5 기본 문법
        

2 시맨틱 요소와 검색 엔진


3 웹페이지의 구성하는 기본 태그
`

string_ex00.each((i, el) => {
    console.log(el)
})