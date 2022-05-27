export = async () => {
    const app = await import("./createApp").then(({ createApp }) => createApp());
    return app.createController().run();
};
