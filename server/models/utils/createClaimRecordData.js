const createClaimRecordDataAfterPublish = (certificateId, channelName, fileType, publishParams, publishResults) => {
  const {
    name,
    metadata: {
      title,
      description,
      thumbnail,
      nsfw,
    },
    claim_address: address,
    bid: amount,
  } = publishParams;
  const {
    claim_id: claimId,
    txid,
    nout,
  } = publishResults;
  return {
    name,
    claimId,
    title,
    description,
    address,
    thumbnail,
    outpoint   : `${txid}:${nout}`,
    height     : 0,
    contentType: fileType,
    nsfw,
    amount,
    certificateId,
    channelName,
  };
};

module.exports = {
  createClaimRecordDataAfterPublish,
};