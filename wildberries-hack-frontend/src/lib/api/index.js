import Search from "./search"
/**
 * Класс для работы с API запросами
 */
class Client {
    constructor(server) {
        this.server = server

        this.search = new Search(this)
    }
    /**
     * Сформировать URL запроса
     * @param {String} path путь без слэшей, например 1/2 для https://site.com/1/2
     */
    url(path) {
        return `${this.server}/${path}`
    }

    axios() {
        
    }
    
}
/**
 * Инициализировать API клиент для выбранного домена
 * @param {String} server Адрес сервера для отправки запросов
 * @returns Client
 */
export default function init(server) {
    return new Client(server)
}