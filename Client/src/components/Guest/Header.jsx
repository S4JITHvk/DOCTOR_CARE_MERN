
import { Disclosure } from '@headlessui/react'



function Header() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
   
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <h1>
                    <span style={{ color: 'white' }}>Doctor</span> <span style={{ color: 'red' }}>Care</span>
                  </h1>
                </div>
                
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              </div>
            </div>
          </div>
        </>
    </Disclosure>
  )
}

export default Header
