# POC

## Шаг 1
Зарегистрируйтесь на сайте используя любой удобный логин и пароль. Изучите веб приложение, похоже в нём есть уязвимость **Sourcemap**. Какой компонент отвечает за отображения комментария к статье? 

Подсказки:
- Source Map — это исходный код приложения, который добавляется к сборке, для удобной отладки веб приложения во время разработки, который по ошибке разработчика может попасть в итоговую версию приложения
- Исходный код виден в консоли разрабочика во вкладке "Отладка", зачастую папка с исходным кодом называется static

(Ответ *CommentItem* или *CommentItem.jsx*)

## Шаг 2

Правильно. Кажется кому то лень было заморачиваться с качественным отображением комментария и разработчик засунул комментарий прям в **dangerouslysetinnerhtml**! Попробуйте вызвать **alert()** и в нём вы получите пароль к аккаунту администратора!

Подсказки
- уязвимость XSS чаще всего происходит из за некачественной обработки пользовательского ввода, попробуйте поэкспериментировать с полем ввода комментария к статье!
- (?) <script>alert()</script>

(Ответ *1234567qwe*)

## Шаг 3

Войдите в систему через логин-пароль администратора. Изучите систему создания новой статьи. Как называется функция, которая отправляет данные о новой статье серверу? 

Подсказки
- Для выполнения этого задания стоит обратиться к исходному коду приложения и найти в нём файл, отвечающий за отображение страницы создания статьи
- Функция расположена внутри компонента ArticleCreator.jsx

(Ответ *addNewArticle*)

## Шаг 4

Кажется на сервере дата обрабатывается с помощью старой версии библиотеки lodash, в которой присутствует уязвимость Prototype pollution. Попробуйте изменить date в теле запроса с помощью burp suite, добавив в прототип объекта поле **flag** со значением **true** и получите флаг!

Подсказка
- для записи даты создания статьи используется функция merge(), которая обрабатывает строку date из запроса и добавляет новые поля даты в запрос к базе данных
- для изменения прототипа обычно используется свойство **__proto__**

(Ответ *fl@g_Pro0toTyp3_1s_p0llu1ed*)

```sh
r = requests.post('http://localhost:5000/api/create', json={
	'userid':1,
	'title': 'AAAAAAAAAAAAA',
	'body': 'cool body!',
	'date':'{"__proto__":{"flag":true}}'
})

```