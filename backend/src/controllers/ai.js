import { addContent, createHistory, getHistory } from "../db/history";
import { getKey } from "../db/keys";
import {
  codeInstructions,
  generateImgReqBody,
  generationConfig,
  genModel,
  imgReqConfig,
} from "../helpers";

export const Conversation = async (req, res) => {
  try {
    const { message, id } = req.body;

    const userId = req.identity._id;

    const type = "chat";

    const history = id
      ? await getHistory({ _id: id, type, userId })
      : await createHistory({ type, userId });

    if (!history) {
      return res.status(404).json({ error: "Conversation history not found" });
    }

    const chatSession = genModel.startChat({
      generationConfig,
      history: history?.content,
    });

    const { response } = await chatSession.sendMessage(message);
    const { content } = response.candidates[0];

    const messageObj = {
      role: "user",
      parts: [{ text: message }],
    };

    await addContent(history._id, messageObj);
    await addContent(history._id, content);

    if (req.onFreeTier) {
      const user = req.identity;
      user.freeGenerations -= 1;
      await user.save();
    }

    return res.status(200).json({ content, id: history._id });
  } catch (error) {
    console.error(error);

    if (error?.errorDetails?.[0]?.domain === "googleapis.com") {
      return res.status(503).json({
        error: "Under construction.",
      });
    }

    return res.status(500).json({ error: "Internal error" });
  }
};

export const getConversationHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const userId = req.identity._id;

    const type = "chat";

    const history = await getHistory({ _id: id, type, userId });

    if (!history) {
      return res.status(404).json({ error: "Conversation history not found" });
    }

    return res.status(200).json(history);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

export const CodeGenerator = async (req, res) => {
  try {
    const { message, id } = req.body;

    const userId = req.identity._id;

    const type = "code";

    const history = id
      ? await getHistory({ _id: id, type, userId })
      : await createHistory({ type, userId });

    if (!history) {
      return res
        .status(404)
        .json({ error: "Code generation history not found" });
    }

    const chatSession = genModel.startChat({
      generationConfig,
      history: codeInstructions.concat(history?.content),
    });

    const { response } = await chatSession.sendMessage(message);
    const { content } = response.candidates[0];

    const messageObj = {
      role: "user",
      parts: [{ text: message }],
    };

    await addContent(history._id, messageObj);
    await addContent(history._id, content);

    if (req.onFreeTier) {
      const user = req.identity;
      user.freeGenerations -= 1;
      await user.save();
    }

    return res.status(200).json({ content, id: history._id });
  } catch (error) {
    console.error(error);

    if (error?.errorDetails?.[0]?.domain === "googleapis.com") {
      return res.status(503).json({
        error: "Under construction.",
      });
    }

    return res.status(500).json({ error: "Internal error" });
  }
};

export const getCodeGeneratorHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const userId = req.identity._id;

    const type = "code";

    const history = await getHistory({ _id: id, type, userId });

    if (!history) {
      return res
        .status(404)
        .json({ error: "Code generation history not found" });
    }

    return res.status(200).json(history);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

export const ImageGenerator = async (req, res) => {
  try {
    const { prompt, size, samples } = req.body;

    const key = await getKey({ identifier: "image", samples });

    const body = generateImgReqBody({ prompt, size, samples, key });

    const response = await fetch(
      "https://modelslab.com/api/v6/realtime/text2img",
      {
        ...imgReqConfig,
        body,
      }
    );

    const { output } = await response.json();

    if (!output) {
      return res.status(503).json({
        error: "Under construction.",
      });
    }

    return res.status(200).json({ images: output });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal error" });
  }
};
