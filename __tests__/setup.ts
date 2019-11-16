export const spyOnLog = jest.spyOn(global.console, 'log').mockImplementation(() => jest.fn());
