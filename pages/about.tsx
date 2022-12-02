// @ts-nocheck
import dynamic from 'next/dynamic'
import type { NextPage } from 'next'
import { Seo, ExternalLinkList, ExternalLink, CurationContractPlug, CreateWhatsMissingPlug } from 'components'

const READING_LIST_LINKS = [
  {
   title: 'Hyperstructures - Jacob Horne (2021)',
   url: 'https://jacob.energy/hyperstructures.html'
  },
  {
   title: 'Headless Brands - Other Internet (2019)',
   url: 'https://otherinter.net/research/headless-brands/'
  },
  {
   title: 'Market-Protocol Fit - Other Internet (2020)',
   url: 'https://otherinter.net/research/market-protocol-fit/'
  },
  {
   title: 'Squad Wealth - Other Internet (2020)',
   url: 'https://otherinter.net/research/squad-wealth/'
  },
  {
   title: 'Primacy - Interdependence (2021)',
   url: 'https://interdependence.fm/episodes/primacism-david-rudnick-on-the-struggle-for-primacy-type-and-poetrys-unique-value-in-an-age-of-digital-and-physical-conflict-and-percy-shelleys-mont-blanc-cwpBIPGY'
  },
  {
    title: 'DAOs are not corporations: Vitalik Buterin (2022)',
    url: 'https://vitalik.ca/general/2022/09/20/daos.html'
  },
  {
    title: 'Post-individualism - Interdependence (2022)',
    url: 'https://www.interdependence.fm/episodes/post-individualism-metalabels-and-web-3-with-yancey-strickler'
  },
  {
    title: '"Everything in Quotes" - Virgil Abloh (2017)',
    url: 'https://www.youtube.com/watch?v=zKYp1t0-xYw&ab_channel=ColumbiaGSAPP'
  },
  {
    title: '"Insert Complicated Title Here" - Virgil Abloh (2017)',
    url: 'https://www.youtube.com/watch?v=qie5VITX6eQ&t=1304s&ab_channel=HarvardGSD'
  },
  {
    title: 'Why the US + Mars Need a Creative Director - Eugene Angelo + Reggie James (2022)',
    url: 'https://www.youtube.com/watch?v=2NP5A3I2stA&t=2s&ab_channel=Baukunst'
  },
  {
    title: 'Life After Lifestyle - Toby Shorin (2022)',
    url: 'https://subpixel.space/entries/life-after-lifestyle/'
  },
  {
    title: 'The Network State and How to Start a New Country - Balaji Srinivasan + Tim Ferris (2022)',
    url: 'https://www.youtube.com/watch?v=FV5SqIm5e90&ab_channel=TimFerriss/'
  },
  {
    title: 'PROTOPIA FUTURES - Planet Earth (2021)',
    url: 'https://medium.com/protopia-futures/protopia-futures-framework-f3c2a5d09a1e'
  },           
 ] as ExternalLink[]

 const ECOSYSTEM_LINKS = [
  {
   title: 'PA Forum',
   url: 'https://pblcasmbly.discourse.group/'
  },
  {
   title: 'PA Governance Portal',
   url: 'https://nouns.build'
  },
  {
   title: 'Github',
   url: 'https://github.com/public-assembly'
  },
  {
   title: 'Docs',
   url: 'https://public-assembly-docs.vercel.app/'
  },
  {
   title: 'Twitter',
   url: 'https://twitter.com/pblcasmbly'
  }
 ] as ExternalLink[] 

const About: NextPage = () => {
  
  return (
    <>
      <Seo title="about"/>      
      <div
        className="text-left mb-8 text-[15px] w-full sm:w-[460px] italic"
      >
        {`"In contrast to the physical world, only one degree of separation lies between everyone on the internet. This heightened connectivity allows for new models of coordination + creation that are native to the digital realm. Public Assembly will test the best practices for leveraging the unique physics of the internet to create what’s missing as fast as possible."`}
      </div>         
      <div
        className="mt-8 font-bold text-[20px] pb-[4px]"
      >
        {"Public Conversation"}
      </div>                
      <ExternalLinkList links={ECOSYSTEM_LINKS} gapSpacing={4} />        
      <div
        className="mt-8 font-bold text-[20px] pb-[4px]"
      >
        {"Reading List"}
      </div>            
      <ExternalLinkList links={READING_LIST_LINKS} gapSpacing={4} />                
    </>
  )
}

export default About
