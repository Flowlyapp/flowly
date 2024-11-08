function getChannelIdFromStartParams(value: string): number | null {
  if (!value) {
    return null
  }
  const num = Number(value.split('c')[1])
  return Number.isNaN(num) ? null : num * -1
}

function getFriendIdFromStartParams(value: string): number | null {
  if (!value) {
    return null
  }
  const num = Number(value.split('f')[1])
  return Number.isNaN(num) ? null : num
}

interface StartAppParams {
  friendId: number | null
  channelId: number | null
}

export function getStartParams(startParams: string | undefined): StartAppParams {
  if (!startParams) {
    return { friendId: null, channelId: null }
  }

  const startParamsArray = startParams.split('_')

  if (startParamsArray.length === 1) {
    return { friendId: null, channelId: getChannelIdFromStartParams(startParamsArray[0]) }
  }

  return {
    friendId: getFriendIdFromStartParams(startParamsArray[1]),
    channelId: getChannelIdFromStartParams(startParamsArray[0]),
  }
}
