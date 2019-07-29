# Items

## Controller

---

Where all CRUD ops is happening, returns with value and status code.

    export const index = async (req, res, next) => {
      const items = await Item.find().sort({ createdAt: -1 })

      res.status(200).json({ items })
    }

---

## Helper

---

Schema validation using Joi

    export const schema = {
      default: Joi.object().keys({
      }),
      id: Joi.object().keys({
        param: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
      })
    }

---

## Model

---

MongoDB Collection Schema

    const itemSchema = new Schema(
      {
        asin: {
          type: String,
          required: true
        }
      },
      {
        timestamps: true,
        usePushEach: true
      }
    )

---

## Routes

---

Setting up the api router .get .post .delete with helper function that validates body and params

    router
      .route('/')
      .get(itemController.index)
      .post(validateBody(schema.default), itemController.create)
