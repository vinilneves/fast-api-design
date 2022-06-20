let _requests = [
    {
        "method": "GET",
        "path": "/users",
        "samples": [
            {
                "name": "Exemplo",
                "description": "Exemplo para testar a funcionalidade",
                "headers": {
                    "authorization": "Bearer eyAAA...ZZZ=="
                },
                "params": {
                    "active": true,
                    "createdAfter": "1989-02-01T03:00:00.000Z",
                    "createdBefore": "1990-01-31T02:00:00.000Z",
                    "search": "Vini",
                    "level": 5
                },
                "response": {
                    "users": [
                        {
                            "name": "Vini",
                            "level": 5,
                            "active": true,
                            "createdAt": "1989-05-08T03:00:00.000Z"
                        }
                    ]
                }
            }
        ]
    },
    {
        "method": "POST",
        "path": "/users/:username",
        "samples": [
            {
                "name": "Exemplo",
                "description": "POST Exemplo para testar a funcionalidade",
                "headers": {
                    "authorization": "Bearer eyAAA...ZZZ=="
                },
                "params": {
                    "active": true,
                    "search": "Vini",
                    "createdAfter": "1989-02-01T03:00:00.000Z",
                    "createdBefore": "1990-01-31T02:00:00.000Z",
                    "level": 5
                },
                "response": {
                    "name": "Vini",
                    "level": 5,
                    "active": true,
                    "createdAt": "1989-05-08T03:00:00.000Z"
                }
            }
        ]
    }
]

export default class RequestsService {
    static compare(path, method)  {
        return (request) => request.method === method && request.path === path
    }

    async list() {
        return _requests
    }

    async save(requests) {
        _requests = requests
    }
}