/** @format */

import React, { useState } from 'react';
import Title from '../../components/owner/Title';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AddCar = () => {
  const { axios, currency } = useAppContext();

  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: 0,
    pricePerDay: 0,
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: 0,
    location: '',
    description: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return null;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('carData', JSON.stringify(car));

      const { data } = await axios.post('/api/owner/add-car', formData);

      if (data.success) {
        toast.success(data.message);
        setImage(null);
        setCar({
          brand: '',
          model: '',
          year: 0,
          pricePerDay: 0,
          category: '',
          transmission: '',
          fuel_type: '',
          seating_capacity: 0,
          location: '',
          description: '',
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='px-4 py-10 md:px-10 flex-1'>
      <Title
        title='Add New Auto'
        subTitle='Fill in details to list a new Auto for booking, including pricing, availability, and Auto specifications.'
      />

      <form
        onSubmit={onSubmitHandler}
        className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'
      >
        {/* Car Image */}
        <div className='flex items-center gap-2 w-full'>
          <label htmlFor='car-image'>
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt=''
              className='h-14 rounded cursor-pointer'
            />
            <input
              type='file'
              id='car-image'
              accept='image/*'
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className='text-sm text-gray-500'>Upload a picture of your Auto</p>
        </div>

        {/* Car Brand & Model */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Brand</label>
            <input
              type='text'
              placeholder='e.g. Bajaj Auto, Mahindra, Piaggio...'
              required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
              value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
            />
          </div>
          <div className='flex flex-col w-full'>
            <label>Model</label>
            <input
              type='text'
              placeholder='e.g. Bajaj RE, Maxima Z, TVS King...'
              required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
            />
          </div>
        </div>

        {/* Car Year, Price, Category */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Year</label>
            <input
              type='number'
              placeholder='2025'
              required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
              value={car.year}
              onChange={(e) => setCar({ ...car, year: e.target.value })}
            />
          </div>
          <div className='flex flex-col w-full'>
            <label>Daily Price ({currency})</label>
            <input
              type='number'
              placeholder='100'
              required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
              value={car.pricePerDay}
              onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
            />
          </div>
          <div className='flex flex-col w-full'>
            <label>Category</label>
            <select
              onChange={(e) => setCar({ ...car, category: e.target.value })}
              value={car.category}
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
            >
              <option value=''>Select a category</option>
              <option value='Passenger Auto'>Passenger Auto</option>
              <option value='Cargo Auto'>Cargo Auto</option>
              <option value='E-Auto'>E-Auto</option>
            </select>
          </div>
        </div>

        {/* Car Transmission, Fuel Type, Seating Capacity */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Transmission</label>
            <select
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
              value={car.transmission}
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
            >
              <option value=''>Select a transmission</option>
              <option value='Automatic'>Automatic</option>
              <option value='Manual'>Manual</option>
              <option value='Semi-Automatic'>Semi-Automatic</option>
            </select>
          </div>
          <div className='flex flex-col w-full'>
            <label>Fuel Type</label>
            <select
              onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
              value={car.fuel_type}
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
            >
              <option value=''>Select a fuel type</option>
              <option value='Petrol'>Petrol</option>
              <option value='LPG'>LPG</option>
              <option value='Electric'>Electric</option>
              <option value='CNG'>CNG</option>
            </select>
          </div>
          <div className='flex flex-col w-full'>
            <label>Seating Capacity</label>
            <input
              type='number'
              placeholder='4'
              required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
              value={car.seating_capacity}
              onChange={(e) =>
                setCar({ ...car, seating_capacity: e.target.value })
              }
            />
          </div>
        </div>

        {/* Car Location */}
        <div className='flex flex-col w-full'>
          <label>Location</label>
          <select
            onChange={(e) => setCar({ ...car, location: e.target.value })}
            value={car.location}
            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
          >
            <option value=''>Select a location</option>
            <option value='Panambur Beach'>Panambur Beach</option>
            <option value='Kadri Manjunath Temple'>Kadri Manjunath Temple</option>
            <option value='Sultan Battery'>Sultan Battery</option>
            <option value='Pilikula Nisargadhama'>Pilikula Nisargadhama</option>
            <option value='Tannirbhavi Beach'>Tannirbhavi Beach</option>
            <option value='St. Aloysius Chapel'>St. Aloysius Chapel</option>
            <option value='Mangaladevi Temple'>Mangaladevi Temple</option>
            <option value='Someshwar Beach'>Someshwar Beach</option>
            <option value='Rosario Cathedral'>Rosario Cathedral</option>
            <option value='Ullal Beach'>Ullal Beach</option>
            <option value='Kudroli Gokarnath Temple'>Kudroli Gokarnath Temple</option>
            <option value='Pilicula Biological Park'>Pilicula Biological Park</option>
            <option value='Bejai Museum'>Bejai Museum</option>
            <option value='Sharavu Mahaganapathi Temple'>Sharavu Mahaganapathi Temple</option>
            <option value='Light House Hill Garden'>Light House Hill Garden</option>
          </select>
        </div>
        {/* Car Description */}
        <div className='flex flex-col w-full'>
          <label>Description</label>
          <textarea
            rows={5}
            placeholder='e.g. A Nice and Stable Auto with a spacious interior and a Great comfort.'
            required
            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
            value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
          ></textarea>
        </div>

        <button className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer'>
          <img src={assets.tick_icon} alt='' />
          {isLoading ? 'Listing...' : 'List Your Auto'}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
