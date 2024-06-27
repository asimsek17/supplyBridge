function respond(response, params) {
    return response.status(params.status || 200).json({ data: params.data })
}

module.exports = respond;