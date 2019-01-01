import { normalize, schema } from 'normalizr';

const friend = new schema.Entity('friend')

const user = new schema.Entity('user', {
  friends: [friend]
});

/**
 *         droplet: "id": 12,
            "user_id": 4,
            "content": "My plot to steal lloyd is coming along [personal]",
            "created_at": "2018-12-31T19:22:21.221Z",
            "updated_at": "2018-12-31T19:22:21.221Z",
            "permission": "personal"
 */

 /**
  *      friend  {
            "id": 3,
            "provider": "email",
            "uid": "lloyd@yahoo.com",
            "allow_password_change": false,
            "name": null,
            "nickname": null,
            "image": null,
            "email": "lloyd@yahoo.com",
            "created_at": "2018-12-31T19:22:20.922Z",
            "updated_at": "2018-12-31T19:22:20.922Z"
        }
  */

  /**
   * user {
   *        "id": 4,
        "email": "adam@snowflek.com",
        "provider": "email",
        "uid": "adam@snowflek.com",
        "allow_password_change": false,
        "name": null,
        "nickname": null,
        "image": null
   * }
   */