db.createUser({
    user: 'admin',
    password: 'admin',
    roles: [
        {
            role: 'readWrite',
            db: 'db-open-science'
        }
    ]
})