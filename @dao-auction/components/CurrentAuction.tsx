import React from "react"
import { useSigner } from "wagmi"
import { useDaoAuctionQuery } from "@dao-auction/hooks/useDaoAuctionQuery"
import AuctionCountdown from "./AuctionCountdown"
import { TokenThumbnail } from "./TokenThumbnail"
import { AuthCheck } from "../../components/elements"

import {
  Auction as AuctionInterface,
  Auction__factory as BuilderNounsAuction__factory,
} from '@zoralabs/nouns-protocol/dist/typechain'
import { BigNumber as EthersBN } from 'ethers'
import { parseUnits } from '@ethersproject/units'

export interface CurrentAuctionProps extends React.HTMLProps<HTMLDivElement> {
  /**
   * Nounish NFT Contract address
   */
  daoAddress: string
}

export default function CurrentAuction({daoAddress, ...props}: CurrentAuctionProps) {
  const { activeAuction } = useDaoAuctionQuery({collectionAddress: daoAddress})
  
  const auctionData = React.useMemo(() => {
    const data = activeAuction?.nouns?.nounsActiveMarket

    const minBidAmount = () => {
      if (data?.highestBidPrice?.chainTokenPrice?.decimal && data?.minBidIncrementPercentage) {
        return (data.highestBidPrice.chainTokenPrice.decimal * (data.minBidIncrementPercentage / 100)) + data.highestBidPrice.chainTokenPrice.decimal
      } else {
        /* @ts-ignore */
        return data?.reservePrice?.chainTokenPrice?.decimal
      }
    }

    return {
      duration: data?.duration,
      endTime: data?.endTime,
      highestBidder: data?.highestBidder,
      highestBidPrice: data?.highestBidPrice?.chainTokenPrice?.decimal,
      highestBidPriceRaw: data?.highestBidPrice?.chainTokenPrice?.raw,
      minBidIncrement: data?.minBidIncrementPercentage,
      minBidAmount: minBidAmount(),
      /* @ts-ignore */
      reservePrice: data?.reservePrice?.chainTokenPrice?.raw,
      tokenId: data?.tokenId,
      address: data?.address,
    }
  }, [
    activeAuction,
    activeAuction?.nouns?.nounsActiveMarket?.highestBidPrice?.chainTokenPrice?.decimal
  ])

  /**
   * Setup auction interactions
   */
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  // const [isError, setIsError] = React.useState(false)
  const [bidAmount, setBidAmount] = React.useState('0')
  const [validBid, setValidBid] = React.useState(false)

  const { data: signer } = useSigner()

  React.useEffect(() => {
    if (auctionData.address && signer) {
      setBuilderNounsAuction(
        BuilderNounsAuction__factory.connect(auctionData.address, signer)
      )
    }
  }, [auctionData.address, signer])

  const [BuilderNounsAuction, setBuilderNounsAuction] = React.useState<AuctionInterface>()

  const handleOnUpdate = React.useCallback(
    (value: string) => {
      let newValue: EthersBN
      try {
        newValue = parseUnits(value, 18)
        if (value >= auctionData?.minBidAmount) {
          setValidBid(true)
        } else {
          setValidBid(false)
        }
        const bidString = newValue.toString()
        setBidAmount(bidString)
      } catch (e) {
        console.error(e)
        return
      }
    },
    [setBidAmount, auctionData?.minBidAmount]
  )

  const handleOnSubmit = React.useCallback(
    async (event: any) => {
      if (auctionData?.tokenId) {
        setIsLoading(true)
        try {
          event.preventDefault()
          const tx = await BuilderNounsAuction?.createBid(auctionData.tokenId, {
            value: bidAmount,
          })
          console.log({ tx })
          setIsSuccess(true)
        } catch (err: any) {
          // setIsError(err)
          console.error(err)
        } finally {
          setIsLoading(false)
        }
      }
    },
    [BuilderNounsAuction, auctionData?.tokenId, bidAmount]
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-[1440px]" {...props}>
      {auctionData?.tokenId && <TokenThumbnail tokenId={auctionData.tokenId} collectionAddress={daoAddress}/>}
      <div className="flex flex-col justify-end gap-4">
        <a href={`https://nouns.build/dao/${daoAddress}`} target="_blank" rel="noreferrer" className="font-bold text-[24px] hover:underline flex flex-row items-center gap-2">
          <span>
            Public Assembly #{auctionData?.tokenId}
          </span>
          <div className="w-[20px] h-[20px]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.3227 16.0689V8.45115H16.7475V17.5H2.5V3.19018H11.5094V4.62119H3.92484V16.0689L15.3227 16.0689ZM15.0678 3.93101H13.1751V2.5H17.5V6.84382H16.0752V4.94291L9.44042 11.6067L8.43305 10.5948L15.0678 3.93101Z" fill="black"/>
            </svg>
          </div>
        </a>
        <div className="flex flex-row gap-10">
          <div className="flex flex-col">
            <span>Current Bid:</span>
            <span>{auctionData?.highestBidPrice} ETH</span>
          </div>
          {auctionData?.endTime && <AuctionCountdown endTime={Number(auctionData.endTime)} />}
        </div>
        <AuthCheck
          connectCopy={'Connect to bid'}
          formUI={
            <div>
              <form onSubmit={handleOnSubmit} className="flex flex-row gap-4">
                <input
                  className="form-input px-[10px] py-[5px]"
                  type="text"
                  pattern="[0-9.]*"
                  placeholder={`${auctionData?.minBidAmount} ETH`}
                  onChange={(event: any) => handleOnUpdate(event.target.value)}
                />
                {!isLoading && !isSuccess
                  ? <button className={`underline ${!validBid && 'pointer-events-none opacity-20'}`}>Place Bid</button>
                  : <>
                      {isLoading && <span>Submitting bid</span>}
                      {isSuccess && <a href={`https://nouns.build/dao/${daoAddress}`} target="_blank" rel="noreferrer">Bid placed: view on nouns.build</a>}
                    </>
                }
              </form>
            </div>
          }
        />
      </div>
    </div>
  )
}