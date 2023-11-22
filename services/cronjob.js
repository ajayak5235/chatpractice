

const { ArchievedMessages } = require("../models/archieved");
const { Message } = require("../models/msg-model");

class CronJobService {
    async runJob() {
        try {
            const messages = await Message.findAll();
            const archivedMessages = messages.map((message) => {
                // Use Object.assign to create a copy of the message without the 'id' property
                const { id, ...archivedData } = message.toJSON(); // Remove 'id' property
                return archivedData;
            });
            await ArchievedMessages.bulkCreate(archivedMessages);
            await Message.destroy({ where: {} });
        } catch (error) {
            console.log('Error while running cron job service', error);
        }
    }
}

module.exports = new CronJobService();