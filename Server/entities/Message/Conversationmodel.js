const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
    {
        participants: [
            {
                participantId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    refPath: 'participants.participantModel',
                },
                participantModel: {
                    type: String,
                    required: true,
                    enum: ['User', 'Doctor'],
                },
            },
        ],
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Message",
                default: [],
            },
        ],
    },
    { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
