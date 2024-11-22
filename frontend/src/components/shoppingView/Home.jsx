import React, { useEffect, useState } from 'react'
import bannerOne from '../../assets/banner-1.webp'
import bannerTwo from '../../assets/banner-2.webp'
import bannerThree from '../../assets/banner-3.webp'
import Nike from '../../assets/Nike.png'
import adidas from '../../assets/adidas.png'
import puma from '../../assets/puma.png'
import zara from '../../assets/zara.png'
import apple from '../../assets/apple.png'
import samsung from '../../assets/samsung.png'
import { Button } from '../ui/button'
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, FootprintsIcon, icons, RefrigeratorIcon, ShirtIcon, WatchIcon } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts } from '@/store/shop/shop.slice'
import ProductTile from './ProductTile'
import { useNavigate } from 'react-router-dom'

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: FootprintsIcon },
  { id: "electronics", label: "Electronics", icon: RefrigeratorIcon },
]

const brandWithIcon = [
  { id: "nike", label: "Nike", icon: Nike },
  { id: "adidas", label: "Adidas", icon: adidas },
  { id: "puma", label: "Puma", icon: puma },
  { id: "zara", label: "Zara", icon: zara },
  { id: "apple", label: "Apple", icon: apple },
  { id: "samsung", label: "Samsung", icon: samsung },
]


const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [bannerOne, bannerTwo, bannerThree];
  const dispatch = useDispatch()
  const { productList } = useSelector(state => state.shopProducts)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 4000);
    return () => clearInterval(timer);
  }, [slides])

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: "atoz" }))
  }, [dispatch])

  const handleNavigateToListingPage = (currentItem, section) => {
    sessionStorage.removeItem('filter');
    const currentFilter = {
      [section]: [currentItem]
    }
    sessionStorage.setItem('filter', JSON.stringify(currentFilter))
    navigate("/shop/listing")
  }



  return (
    <div className='flex flex-col'>
      <div className='relative w-full h-[600px] overflow-hidden'>
        {
          slides.map((slide, index) =>
            <img src={slide} key={index} alt="" className={`${index === currentSlide ? "opacity-100" : "opacity-0"} absolute top-0 left-0 w-full object-cover transition-opacity duration-1000`} />
          )
        }
        <Button onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)} variant="outline" size="icon" className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80">
          <ChevronLeftIcon className='w-4 h-4' />
        </Button>

        <Button onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)} variant="outline" size="icon" className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80">
          <ChevronRightIcon className='w-4 h-4' />
        </Button>
      </div>
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-4xl font-bold text-center mb-8'>Shop By Category</h2>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
            {
              categoriesWithIcon.map(categoryItem => <Card onClick={() => handleNavigateToListingPage(categoryItem.id, 'category')} className="cursor-pointer hover:shadow-lg transition-shadow" key={categoryItem.id}>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className='w-12 h-12 mb-4 text-primary' />
                  <span className='font-bold'>{categoryItem.label}</span>
                </CardContent>
              </Card>)
            }
          </div>
        </div>
      </section>

      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-4xl font-bold text-center mb-8'>Shop By Brand</h2>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
            {
              brandWithIcon.map(brandItem => <Card onClick={() => handleNavigateToListingPage(brandItem.id, 'brand')} className="cursor-pointer hover:shadow-lg transition-shadow" key={brandItem.id}>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img src={brandItem.icon} alt={brandItem.label} className='w-32 h-32 mb-4 ' />
                  <span className='font-bold'>{brandItem.label}</span>
                </CardContent>
              </Card>)
            }
          </div>
        </div>
      </section>

      {/* <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Feature Products</h2>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {
              productList && productList.length > 0 ?
                productList.map(productItem => <ProductTile product={productItem} />)
                : null
            }
          </div>
        </div>
      </section> */}
    </div>
  )
}

export default Home
