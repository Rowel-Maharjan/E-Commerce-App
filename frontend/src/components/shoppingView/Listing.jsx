import React, { useEffect, useState } from 'react'
import Filter from './Filter'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { ArrowUpDownIcon } from 'lucide-react'
import { sortOptions } from '../config'
import ProductTile from './ProductTile'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts } from '@/store/shop/shop.slice'
import { useSearchParams } from 'react-router-dom'
import ProductDetails from './ProductDetails'

const Listing = () => {
  const dispatch = useDispatch()
  const { productList, productDetails } = useSelector(state => state.shopProducts)
  const [Sort, setSort] = useState({})
  const [filter, setFilter] = useState({})
  const [searchParams, setSearchParams] = useSearchParams()
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)

  const handleSort = (value) => {
    setSort(value)
  }

  const handleFilter = (filterOption, filterOptionId) => {
    const cpyfilter = filter;
    const existingOption = cpyfilter[filterOption] || [];
    const updatedOptionId = existingOption.includes(filterOptionId) ?
      existingOption.filter((Optionid) => Optionid != filterOptionId) :
      [...existingOption, filterOptionId]

    const updatedValue = {
      ...cpyfilter,
      [filterOption]: updatedOptionId
    }
    setFilter(updatedValue)
    sessionStorage.setItem("filter", JSON.stringify(updatedValue))
  };

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: filter, sortParams: Sort }))
  }, [dispatch, Sort, filter])

  useEffect(() => {
    if (productDetails)
      setOpenDetailsDialog(true)
  }, [productDetails])



  useEffect(() => {
    setSort("atoz")
    setFilter(JSON.parse(sessionStorage.getItem("filter")) || {}) //To get the filter Value in page reload
  }, [])

  //For Filter
  useEffect(() => {
    const queryParams = [];    //Need to create Array to store 

    for (const key in filter) {     //This is forin loop
      if (Object.prototype.hasOwnProperty.call(filter, key)) {
        const element = filter[key];
        if (element.length > 0) {     //Only push if there are elements in an array
          queryParams.push(`${key}=${encodeURIComponent(element)}`)
        }
      }
    }
    const finalParams = queryParams.join("&") //To join the elements of an array with &
    setSearchParams(finalParams)
  }, [filter])

  return (
    <div className='grid grid-cols-1 sm:grid-cols-[150px_1fr] md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6'>
      <Filter filter={filter} setFilter={setFilter} handleFilter={handleFilter} />

      <div className='bg-background w-full rounded-lg shadow-sm'>
        <div className='p-4 border-b flex items-center justify-between'>
          <h2 className='text-lg font-extrabold'>All Products</h2>
          <div className='flex items-center gap-4'>
            <span className='text-muted-foreground'>{productList.length} Products</span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1 focus-visible:ring-0 focus-visible:ring-offset-0">
                  <ArrowUpDownIcon className='h-4 w-4' />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className='w-52' align="end">
                {
                  <DropdownMenuRadioGroup value={Sort} onValueChange={handleSort}  >
                    {
                      sortOptions.map(options =>
                        <DropdownMenuRadioItem value={options.id} key={options.id}>{options.label}</DropdownMenuRadioItem>
                      )
                    }
                  </DropdownMenuRadioGroup>
                }
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
          {
            productList && productList.length > 0 ?
              productList.map(product => <ProductTile key={product._id} product={product} setOpenDetailsDialog={setOpenDetailsDialog} />) : <div className='text-lg font-bold'>No Products to show</div>
          }
        </div>
      </div>
      <ProductDetails open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
    </div>
  )
}

export default Listing
