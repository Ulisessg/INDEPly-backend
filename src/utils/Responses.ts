/* eslint-disable class-methods-use-this */

class Responses {
  success(req: any, res: any, data: any) {
    res.json({ error: false, message: data });
  }

  error(req: any, res: any, errorReason: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log(errorReason);
    }

    res.json({ error: true, message: 'Internal Server Error' });
  }
}
export default Responses;
