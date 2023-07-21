class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _handleRequest(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${
            res.status
        }`);
    }

    handleError(error) {
        console.log(error);
    }

    getInitialCards() {
        return fetch(`${
            this._baseUrl
        }/cards`, {
            method: 'GET',
            credentials: "include",
            headers: this._headers
        }).then(this._handleRequest)
    }

    getUserInfo() {
        return fetch(`${
            this._baseUrl
        }/users/me`, {
            method: "GET",
            credentials: "include",
            headers: this._headers
        }).then(this._handleRequest);
    }

    editProfileInfo(data) {
        return fetch(`${
            this._baseUrl
        }/users/me`, {
            method: "PATCH",
            credentials: "include",
            headers: this._headers,
            body: JSON.stringify(
                {name: data.name, about: data.about}
            )
        }).then(this._handleRequest);
    }

    addNewCard(data) {
        return fetch(`${
            this._baseUrl
        }/cards`, {
            method: "POST",
            credentials: "include",
            headers: this._headers,
            body: JSON.stringify(
                {name: data.name, link: data.link}
            )
        }).then(this._handleRequest);
    }

    deleteCard(cardId) {
        return fetch(`${
            this._baseUrl
        }/cards/${cardId}`, {
            method: "DELETE",
            credentials: "include",
            headers: this._headers
        }).then(this._handleRequest);
    }

    _addLike(cardId) {
        return fetch(`${
            this._baseUrl
        }/cards/${cardId}/likes`, {
            method: "PUT",
            credentials: "include",
            headers: this._headers
        }).then(this._handleRequest);
    }

    _deleteLike(cardId) {
        return fetch(`${
            this._baseUrl
        }/cards/${cardId}/likes`, {
            method: "DELETE",
            credentials: "include",
            headers: this._headers
        }).then(this._handleRequest);
    }

    updateAvatar(res) {
        return fetch(`${
            this._baseUrl
        }/users/me/avatar`, {
            method: "PATCH",
            credentials: "include",
            headers: this._headers,
            body: JSON.stringify(
                {avatar: res.avatar}
            )
        }).then(this._handleRequest);
    }

    changeLikeCardStatus(cardId, isLiked) {
        this._status = isLiked ? this._addLike(cardId) : this._deleteLike(cardId);
        return this._status;
    }
}

export const api = new Api({
    baseUrl: "https://api.mesto.almichael.nomoredomains.xyz/",
    headers: {
        "Content-Type": "application/json"
    }
});
