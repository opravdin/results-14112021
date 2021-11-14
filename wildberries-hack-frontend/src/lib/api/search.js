class Search {
    constructor(client) {
        this.client = client
    }

    query(text) {
        //let url = this.client.url('?q='+encodeURI(text))
        return fetch("http://51.158.171.158:8087/search?q="+text)
        // return new Promise((resolve) => {
        //     let res = []
        //     for (let i = 0; i < 5; i++) {
        //         res.push(`${text} подсказка ${i+1}`)
        //     }
        //     resolve(res)
        // })
    }
    searchWb(query) {
        let url = 'https://wbxsearch.wildberries.ru/suggests/common?query='+encodeURI(query)
        return fetch(url)
    }
}
export default Search