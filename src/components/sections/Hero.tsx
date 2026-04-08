'use client'

import { useTypewriter } from '@/hooks'
import StarCanvas from '@/components/canvas/StarCanvas'
import useGetMe from '@/contexts/useGetMe'
import Image from 'next/image'

const ROLES = [
  'Full Stack Developer',
  'Backend Engineer',
  'Frontend Developer',
  'React Specialist',
  'Next.js Developer',
]

const ORBIT_ICONS = [
  { label: 'React', color: '#61DAFB', svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 9.861A2.139 2.139 0 1 0 12 14.139 2.139 2.139 0 1 0 12 9.861zM6.008 16.255l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.119.133.468a23.53 23.53 0 0 0 1.363 3.578l.101.213-.101.213a23.307 23.307 0 0 0-1.363 3.578l-.133.467zM5.317 8.95c-2.674.751-4.315 1.9-4.315 3.046 0 1.145 1.641 2.294 4.315 3.046a24.95 24.95 0 0 1 1.182-3.046A24.752 24.752 0 0 1 5.317 8.95zM17.992 16.255l-.133-.469a23.357 23.357 0 0 0-1.364-3.577l-.101-.213.101-.213a23.42 23.42 0 0 0 1.364-3.578l.133-.468.473.119c3.517.889 5.535 2.398 5.535 4.14s-2.018 3.25-5.535 4.139l-.473.12zm-.491-4.259c.48 1.039.877 2.06 1.182 3.046 2.675-.752 4.315-1.901 4.315-3.046 0-1.146-1.641-2.294-4.315-3.046a24.788 24.788 0 0 1-1.182 3.046z" /></svg> },
  { label: 'Next.js', color: '#ffffff', svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" /></svg> },
  { label: 'TypeScript', color: '#3178C6', svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.756v2.086H9.366v9.75H6.945v-9.75H3.375z" /></svg> },
  { label: 'Node.js', color: '#339933', svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082 c0.570,0.329,0.924,0.944,0.924,1.603v10.15c0,0.659-0.354,1.275-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z" /></svg> },
  { label: 'Supabase', color: '#3ECF8E', svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.015.985 1.259 1.408 1.873.636l9.262-11.652c1.093-1.375.113-3.403-1.645-3.403h-9.58L11.9 1.036z" /></svg> },
  { label: 'PostgreSQL', color: '#336791', svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02A10.922 10.922 0 0 0 12.6.258C11.422.238 10.41.524 9.594 1.0a.538.538 0 0 0-.05.033C7.99.743 6.855.983 5.992 1.5c-.162.096-.31.204-.453.318C4.422 1.047 3.33.86 2.473 1.057c-.043.01-.085.021-.127.033A2.267 2.267 0 0 0 .725 2.268C.082 3.619.088 5.398.78 7.62c.448 1.43 1.013 2.572 1.37 3.2-.17.502-.278 1.064-.232 1.626.058.712.277 1.448.766 1.996.131.147.278.272.434.39-.11.582-.226 1.133-.378 1.64-.382 1.27-.818 2.099-1.314 2.61a.765.765 0 1 0 1.084 1.08c.773-.777 1.32-1.802 1.757-3.2.131-.434.243-.886.348-1.348.062.016.124.028.187.038.494 2.22 1.302 3.942 2.575 5.005 1.357 1.128 3.155 1.566 5.33 1.193a4.55 4.55 0 0 0 .57-.138c.233-.073.44-.16.636-.261.65.15 1.387.185 2.206.068 1.82-.26 3.372-1.176 4.267-2.47.888-1.282 1.186-2.904.702-4.614-.01-.033-.02-.067-.032-.1a5.777 5.777 0 0 0-.553-1.223c.346-.608.65-1.39.822-2.26.206-1.04.152-2.156-.273-3.073a.762.762 0 0 0-.05-.1c.814-1.52 1.177-3.048.963-4.432-.238-1.565-1.15-2.78-2.83-3.34a.755.755 0 0 0-.067-.02 7.596 7.596 0 0 0-1.725-.209zm.15 1.53c.44.01.878.065 1.293.162 1.157.38 1.732 1.189 1.913 2.348.184 1.21-.205 2.659-1.072 4.155-.026.045-.049.092-.067.14-.677-.896-1.538-1.555-2.535-1.926-.264-.1-.537-.176-.818-.228.05-.634.099-1.305.105-2.02.012-1.099-.175-2.075-.465-2.632a8.216 8.216 0 0 1 1.646.001zm-5.117.36c.476.032.907.182 1.27.43.14.62.347 1.555.34 2.666-.007.74-.057 1.44-.107 2.09-.077.006-.154.013-.232.022-1.021.113-1.956.53-2.75 1.201-.04-.05-.08-.1-.124-.147a7.054 7.054 0 0 1-.408-.51C9.494 6.52 9.06 5.032 9.01 3.905c.577-.625 1.42-.99 2.43-1.024a6.62 6.62 0 0 1 .72.01zm-5.167.592c.316-.03.66.012 1.024.113-.126.07-.252.143-.373.223C7 3.1 6.56 3.562 6.264 4.18c-.347.72-.479 1.614-.443 2.652.017.496.072 1.01.156 1.53a6.044 6.044 0 0 0-2.2 1.603c-.245-.528-.56-1.33-.832-2.19-.63-2.013-.636-3.573-.15-4.534a.743.743 0 0 1 .424-.373c.57-.139 1.299.004 2.15.505.16.095.33.136.497.114zm2.957 3.505c.584.013 1.12.197 1.59.553-.523.54-.924 1.2-1.14 1.975a4.955 4.955 0 0 0-.152 1.798c-.333.232-.672.411-1.012.535-.774.282-1.535.264-2.261-.083a4.742 4.742 0 0 1-.026-.422c-.044-1.207.105-2.15.41-2.783.283-.587.674-.95 1.221-1.257a3.158 3.158 0 0 1 1.37-.316zm4.386.155c.245 0 .48.026.705.072.96.2 1.78.817 2.406 1.87.428.72.601 1.633.428 2.611-.132.712-.394 1.394-.7 1.894a5.084 5.084 0 0 0-3.245-2.005 4.798 4.798 0 0 0-.64-.059 4.933 4.933 0 0 1 .135-1.755c.194-.71.537-1.3 1.006-1.75a.756.756 0 0 0-.095-.002v.124zm-2.258 3.434a3.5 3.5 0 0 1 .46.03c1.044.14 1.96.695 2.618 1.619.567.8.86 1.895.548 3.015-.636 2.28-2.344 3.498-5.19 3.015-1.164-.203-1.915-.63-2.41-1.337-1.11-1.59-.878-4.2.765-5.643.716-.627 1.7-1.01 2.818-.995.13-.002.258-.003.39-.002zm.608 2.38c-.45-.004-.82.105-1.084.345-.543.49-.695 1.395-.347 2.067a1.09 1.09 0 0 0 .977.601c.046 0 .093-.003.14-.01.494-.07.878-.485.94-.988.07-.563-.253-1.08-.588-1.43a.959.959 0 0 0-.038-.585z" /></svg> },
  { label: 'Tailwind', color: '#06B6D4', svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" /></svg> },
  { label: 'Docker', color: '#2496ED', svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186h-2.12a.186.186 0 0 0-.185.185v1.888c0 .102.084.185.185.185m-2.974 0h2.12a.186.186 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186h-2.12a.184.184 0 0 0-.184.185v1.888c.001.102.083.185.184.185m29.125 7.133c-.542-.317-1.167-.475-1.875-.475-.859 0-1.636.243-2.33.729-.694-.486-1.453-.729-2.277-.729-.688 0-1.315.158-1.877.476v-.33c0-.27-.215-.491-.483-.491h-1.82a.49.49 0 0 0-.49.49v9.862c0 .272.22.492.49.492h1.82a.49.49 0 0 0 .483-.492v-3.54c.56.198 1.177.297 1.844.297.824 0 1.583-.244 2.277-.73.694.486 1.453.73 2.277.73a4.76 4.76 0 0 0 1.876-.477v.33c0 .27.215.49.484.49h1.82a.49.49 0 0 0 .488-.49V15.45a.49.49 0 0 0-.487-.491h-1.82a.49.49 0 0 0-.484.491v.33z" /></svg> },
  { label: 'Git', color: '#F05032', svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" /></svg> },
  { label: 'GraphQL', color: '#E10098', svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.051 2.751l4.935 2.85c.816-.859 2.173-.893 3.032-.077.86.816.893 2.173.077 3.032-.593.625-1.484.814-2.265.499l-3.463 5.962c.887.876.89 2.308.007 3.188-.883.88-2.315.877-3.195-.006-.38-.381-.594-.87-.618-1.37H8.463c-.124 1.013-1.008 1.783-2.038 1.759-1.031-.024-1.878-.837-1.952-1.864-.075-1.027.637-1.952 1.655-2.12V9.084c-.97-.175-1.695-1.016-1.695-2.009 0-1.129.916-2.044 2.044-2.044.68 0 1.315.331 1.713.876l4.918-2.84c-.138-.549-.009-1.137.357-1.576.667-.81 1.868-.925 2.676-.259.31.255.527.593.628.959zM9.089 9.812c.256.115.488.281.68.491l4.917-2.838c-.012-.143-.007-.287.015-.43L9.766 4.18c-.189.272-.433.502-.718.675v4.957zm5.723 5.948c.176.412.204.87.08 1.3h2.073c.183-.981 1.006-1.73 2.002-1.757V9.084c-.309-.056-.603-.179-.86-.365l-3.465 5.964c.078.022.154.05.228.083zm-7.024-.028c.13.045.253.103.368.174l3.463-5.964c-.138-.11-.259-.238-.36-.381l-4.918 2.84c.108.258.167.54.167.83 0 .217-.037.433-.108.635l1.388.866zm1.317 1.297c0 .558.453 1.01 1.011 1.01.558 0 1.01-.453 1.01-1.011 0-.558-.452-1.01-1.01-1.01-.558 0-1.011.452-1.011 1.011z" /></svg> },
  { label: 'MongoDB', color: '#47A248', svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.154-1.86-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z" /></svg> },
]

export default function Hero() {

  const role = useTypewriter(ROLES, 90, 60, 2200)
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const { data } = useGetMe()

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <StarCanvas />

      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/6 w-96 h-96 rounded-full blur-3xl opacity-20 animate-float"
        style={{ background: 'radial-gradient(circle, #0EA5E9, transparent)' }} />
      <div className="absolute bottom-1/4 right-1/6 w-80 h-80 rounded-full blur-3xl opacity-15 animate-float-delayed"
        style={{ background: 'radial-gradient(circle, #14B8A6, transparent)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-5"
        style={{ background: 'radial-gradient(circle, #06B6D4, transparent)' }} />

      {/* Geometric decorations */}
      <div className="absolute top-24 right-24 w-14 h-14 border border-cyan-500/30 rotate-45 animate-spin-slow" />
      <div className="absolute bottom-32 left-24 w-8 h-8 border border-teal-400/40 rotate-12 animate-float-delayed" />
      <div className="absolute top-1/3 left-16 w-3 h-3 rounded-full bg-sky-400/60 animate-float" />
      <div className="absolute bottom-1/3 right-20 w-5 h-5 rounded-full bg-cyan-400/40 animate-float-delayed" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 flex flex-col lg:flex-row items-center gap-16">

        {/* LEFT — Text content */}
        <div className="flex-1 space-y-6 text-center lg:text-left">

          {/* Badge */}
          <div className="animate-slide-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-[var(--cyan)]">
              <span className="w-2 h-2 rounded-full bg-[var(--emerald)] animate-pulse" />
              {data?.availability_message?? "Available for opportunities"}
            </span>
          </div>
          {/* Name */}
          <div className="animate-slide-up opacity-0 delay-200" style={{ animationFillMode: 'forwards' }}>
            <h1 className="section-title text-[var(--text-primary)] leading-tight">
              Hi, I&apos;m <br />
              <span className="gradient-text">{data?.name || "Najmus Sakib"}</span>
            </h1>
          </div>

          {/* Typewriter role */}
          <div className="animate-slide-up opacity-0 delay-300" style={{ animationFillMode: 'forwards' }}>
            <h2 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
              <span className="shine-text">{role}</span>
              <span className="text-[var(--primary)] animate-pulse ml-1">|</span>
            </h2>
          </div>

          {/* Bio */}
          <div className="animate-slide-up opacity-0 delay-400" style={{ animationFillMode: 'forwards' }}>
            <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Building <span className="text-[var(--primary)] font-medium">modern</span>,{' '}
              <span className="text-[var(--cyan)] font-medium">scalable</span>, and{' '}
              <span className="text-[var(--teal)] font-medium">elegant</span> web applications
              from <span className="text-[var(--emerald)] font-medium">Bangladesh</span>.
            </p>
          </div>

          {/* Stats */}
          <div className="animate-slide-up opacity-0 delay-500" style={{ animationFillMode: 'forwards' }}>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {[
                { num: '15+', label: 'Projects' },
                { num: '2+', label: 'Years Exp.' },
                { num: '10+', label: 'Technologies' },
              ].map(s => (
                <div key={s.label} className="glass-card px-5 py-3 rounded-2xl text-center">
                  <div className="text-2xl font-bold gradient-text" style={{ fontFamily: 'var(--font-display)' }}>
                    {s.num}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="animate-slide-up opacity-0 delay-600" style={{ animationFillMode: 'forwards' }}>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button onClick={() => scrollTo('projects')} className="btn-primary" data-hover>
                View Projects
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button onClick={() => scrollTo('contact')} className="btn-outline" data-hover>
                Contact Me
              </button>
            </div>
          </div>

          {/* Social icons */}
          <div className="animate-slide-up opacity-0 delay-700" style={{ animationFillMode: 'forwards' }}>
            <div className="flex gap-3 justify-center lg:justify-start">
              {[
                { href: data?.github_url, label: 'GitHub', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg> },
                { href: data?.linkedin_url, label: 'LinkedIn', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
                { href: data?.twitter_url, label: 'Twitter', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
              ].map(s => (
                <a key={s.label} href={s.href || '#'} target="_blank" rel="noopener noreferrer" data-hover
                  className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all duration-300"
                  aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Orbiting photo */}
        <div className="flex-1 flex justify-center items-center animate-fade-in opacity-0 delay-400" style={{ animationFillMode: 'forwards' }}>
          <div className="relative w-[340px] h-[340px] md:w-[420px] md:h-[420px]">

            {/* Outer orbit ring */}
            <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-spin-slow" />
            <div className="absolute inset-4 rounded-full border border-teal-400/15 animate-spin-reverse" />

            {/* Orbiting tech icons */}
            {ORBIT_ICONS.map((icon, i) => (
              <div
                key={icon.label}
                className="absolute inset-0 flex items-center justify-center"
                style={{ animation: `orbit ${22 + i * 0.5}s linear infinite`, animationDelay: `${-i * (22 / ORBIT_ICONS.length)}s` }}
              >
                <div
                  className="w-9 h-9 rounded-xl glass-card flex items-center justify-center shadow-lg"
                  style={{ color: icon.color }}
                  title={icon.label}
                >
                  <div className="w-5 h-5">{icon.svg}</div>
                </div>
              </div>
            ))}

            {/* Center photo */}
            <div className="absolute inset-12 md:inset-14 rounded-full overflow-hidden border-2 border-cyan-400/40 animate-pulse-glow bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center">
              {data?.avatar_url ?
                <Image src={`${data?.avatar_url}`} alt="Najmus Sakib" width={500} height={500} className="object-cover" />:
                  <span className="text-6xl">👨‍💻</span>
              }
                </div>
          </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in opacity-0 delay-800" style={{ animationFillMode: 'forwards' }}>
          <span className="text-xs text-[var(--text-secondary)] tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-9 rounded-full border border-[var(--border)] flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-[var(--primary)] animate-bounce" />
          </div>
        </div>
    </section>
  )
}
