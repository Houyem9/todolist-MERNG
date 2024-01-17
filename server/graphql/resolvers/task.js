import { GraphQLError } from "graphql";
import { BAD_REQUEST, ERROR_SENT, FORBIDDEN, NOTIFICATION_SENT, REQUIRED_FIELDS, WRONG_MESSAGE } from "../../inc/constants.js";
import { Task } from "../../models/index.js";
import webpush from "web-push";


export default {
    Query: {
        getTasks: async () => {
            const tasks = await Task.find() // get all tasks in DB
            return tasks
        }
    },
    Mutation: {
        addNewTask: async (_,{title}) => {
            // define the errors array
            const errors = {}

            // if title, state or date are empty throw an error
            if (!title) {
                // define a new error at "fields"
                errors.fields = REQUIRED_FIELDS;
                throw new GraphQLError(REQUIRED_FIELDS, {
                    extensions: { code: FORBIDDEN, errors }
                });
            }
            // else
            try {
                // add new task
                const newTask = new Task({
                    title
                })
                await newTask.save(); // save it in DB
                return newTask
            } catch (e) {
                // if there is an error
                console.log("Can not add this task", e)
                // define new error at "message"
                errors.message = WRONG_MESSAGE;
                throw new GraphQLError(WRONG_MESSAGE, {
                    extensions: { code: BAD_REQUEST, errors },
                });
            }
        },
        updateTask: async (_,{_id, title}) => {
            // define the errors array
            const errors = {}

            // if _id, title, state or date are empty throw an error
            if (!_id || !title) {
                // define a new error at "fields"
                errors.fields = REQUIRED_FIELDS;
                throw new GraphQLError(REQUIRED_FIELDS, {
                    extensions: { code: FORBIDDEN, errors }
                });
            }
            // else
            try {
                // update the task depend in the _id
                await Task.updateOne({ _id }, {
                    $set: {
                        title
                    }
                });
                return true
            } catch (e) {
                // if there is an error
                console.log("Can not update this task", e)
                // define new error at "message"
                errors.message = WRONG_MESSAGE;
                throw new GraphQLError(WRONG_MESSAGE, {
                    extensions: { code: BAD_REQUEST, errors },
                });
            }
        },
        deleteOneTask: async (_, { _id }) => {
            const errors = {}
            const isTask = await Task.findOne({ _id });

            // if task exist
            if (!isTask) {
                errors.fields = WRONG_MESSAGE;
                throw new GraphQLError(REQUIRED_FIELDS, {
                    extensions: { code: FORBIDDEN, errors }
                });
            }
            try {
                await Task.deleteOne({ _id });
            } catch (e) {
                // define the error
                errors.message = WRONG_MESSAGE;
                console.log('------>delete task failed', e)
                throw new GraphQLError(errors.message, {
                    extensions: { code: BAD_REQUEST, errors },
                });
            }
            return true;
        },
        // sendNotification: async(_, {title, body, icon, url})=>{
        //     const errors = {}

        //     const notificationPayload = {
        //         title,
        //         body,
        //         icon,
        //         data: {
        //           url: url,
        //         },
        //     };
          
        //     Promise.all(
        //       subscriptions.map((subscription) =>
        //         webpush.sendNotification(subscription, JSON.stringify(notificationPayload))
        //       )
        //     )
        //       .then(() => {return NOTIFICATION_SENT} )
        //       .catch((err) => {
        //         errors.message = ERROR_SENT
        //         throw new GraphQLError(errors.message, {
        //             extensions: { code: BAD_REQUEST, errors },
        //         });
        //       });
        // }
        
    }

}