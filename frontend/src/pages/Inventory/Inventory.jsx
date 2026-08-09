import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Grid, ArrowUpDown } from 'lucide-react';
import Container from '../../components/Container/Container';
import PageHeader from '../../components/PageHeader/PageHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';
import VehicleCard from '../../components/VehicleCard/VehicleCard';
import { vehiclesData } from '../../data/vehicles';
import styles from './Inventory.module.css';

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('price-desc');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    brand: 'All',
    model: '',
    year: 'All',
    fuel: 'All',
    transmission: 'All',
    bodyType: 'All',
    maxPrice: '350000',
    maxMileage: 'All'
  });

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      brand: 'All',
      model: '',
      year: 'All',
      fuel: 'All',
      transmission: 'All',
      bodyType: 'All',
      maxPrice: '350000',
      maxMileage: 'All'
    });
    setSearchTerm('');
  };

  const filteredVehicles = useMemo(() => {
    return vehiclesData
      .filter((vehicle) => {
        // Keyword Search
        const matchesSearch =
          vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.location.toLowerCase().includes(searchTerm.toLowerCase());

        // Brand Filter
        const matchesBrand = filters.brand === 'All' || vehicle.brand.toLowerCase() === filters.brand.toLowerCase();

        // Model Filter
        const matchesModel = !filters.model || vehicle.model.toLowerCase().includes(filters.model.toLowerCase());

        // Year Filter
        const matchesYear = filters.year === 'All' || vehicle.year.toString() === filters.year;

        // Fuel Filter
        const matchesFuel = filters.fuel === 'All' || vehicle.fuel.toLowerCase().includes(filters.fuel.toLowerCase());

        // Transmission Filter
        const matchesTransmission =
          filters.transmission === 'All' ||
          vehicle.transmission.toLowerCase().includes(filters.transmission.toLowerCase());

        // Body Type Filter
        const matchesBody =
          filters.bodyType === 'All' ||
          (vehicle.bodyType && vehicle.bodyType.toLowerCase() === filters.bodyType.toLowerCase());

        // Price Filter
        const matchesPrice = vehicle.price <= parseInt(filters.maxPrice || '350000');

        // Mileage Filter
        const numericMileage = parseInt(vehicle.mileage.replace(/[^0-9]/g, '') || 0);
        const matchesMileage =
          filters.maxMileage === 'All' || numericMileage <= parseInt(filters.maxMileage);

        return (
          matchesSearch &&
          matchesBrand &&
          matchesModel &&
          matchesYear &&
          matchesFuel &&
          matchesTransmission &&
          matchesBody &&
          matchesPrice &&
          matchesMileage
        );
      })
      .sort((a, b) => {
        if (sortOption === 'price-asc') return a.price - b.price;
        if (sortOption === 'price-desc') return b.price - a.price;
        if (sortOption === 'year-desc') return b.year - a.year;
        return 0;
      });
  }, [searchTerm, filters, sortOption]);

  return (
    <div className={styles.inventoryPage}>
      {/* Page Hero */}
      <PageHeader
        title="Browse Our Inventory"
        subtitle="Discover verified high-performance, electric, and luxury vehicles available for immediate purchase or trade."
        breadcrumbs={[{ label: 'Inventory' }]}
      />

      <Container className={styles.containerPadding}>
        <div className={styles.inventoryLayout}>
          {/* Filter Sidebar */}
          <div className={`${styles.sidebarWrapper} ${isMobileFilterOpen ? styles.mobileOpen : ''}`}>
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Main Content Area */}
          <main className={styles.mainContent}>
            {/* Top Toolbar */}
            <div className={styles.topToolbar}>
              <div className={styles.searchBoxWrapper}>
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Search Porsche, BMW M4, Electric..."
                />
              </div>

              <div className={styles.toolbarActions}>
                <button
                  className={styles.mobileFilterToggle}
                  onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                >
                  <SlidersHorizontal size={16} /> Filters
                </button>

                <div className={styles.sortWrapper}>
                  <ArrowUpDown size={14} className={styles.sortIcon} />
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className={styles.sortSelect}
                  >
                    <option value="price-desc">Price: High to Low</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="year-desc">Newest Year</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.resultsMeta}>
              Showing <strong>{filteredVehicles.length}</strong> of <strong>{vehiclesData.length}</strong> available vehicles
            </div>

            {/* Vehicle Grid - 9 Modern Cards */}
            {filteredVehicles.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={styles.vehicleGrid}
              >
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </motion.div>
            ) : (
              <div className={styles.noResultsBox}>
                <h3>No Vehicles Match Your Search</h3>
                <p>Try adjusting your search criteria or resetting your sidebar filters.</p>
                <button onClick={handleResetFilters} className={styles.resetBtnAction}>
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </Container>
    </div>
  );
};

export default Inventory;
