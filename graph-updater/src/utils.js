
/**
 * TODO: tidy up the API for this helper function. 
 * @param {*} natsClient 
 * @param {*} queueName 
 * @param {*} endpointList 
 */
export async function publishToNats(natsClient, queueName, endpointList) {
  for (let i = 0; i < endpointList.length; i++) {
    await natsClient.publish(queueName, jc.encode({
      endpoint: endpointList[i],
    }));
  }
}