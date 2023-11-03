import { Component } from '@angular/core';
import * as L from 'leaflet';
import { ApiCallService } from './api-call.service';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ip-address-tracker';
  constructor(private apiService: ApiCallService) { }
  private map: any;
  private marker: any;
  private poi = {
    lat: 0,
    lon: 0,
  }
  public geodata: any;
  ipForm = new FormGroup({
    searchInp: new FormControl(null, [Validators.required]),
  })

  customValidator(value: any) {
    // Regex expression for validating IPv4
    let ipv4 = /(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])/;
    // Regex expression for validating IPv6
    let ipv6 = /((([0-9a-fA-F]){1,4})\:){7}([0-9a-fA-F]){1,4}/;

    if (value.match(ipv4) || value.match(ipv6)) {
      return true;
    }
    return false;
  }

  onSubmit() {
    const formValues = this.ipForm.value;
    // console.log("values", formValues);
    const searchInp = formValues.searchInp
    const isValid = this.customValidator(searchInp);
    if (isValid) {
      this.getGeoData(formValues.searchInp);
    } else {
      // alert('Invalid IP address format');
      Swal.fire({
        icon: 'error',
        text: 'Invalid IP address format',
      })
      this.ipForm.reset();
    }
  }

  initMap() {
    this.map = L.map('map', {
      center: [this.poi.lat, this.poi.lon],
      zoom: 16,
      zoomControl: false
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 12,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    const greenIcon = L.icon({
      iconUrl: '../assets/images/icon-location.svg',
      iconSize: [30, 40], // size of the icon
    });
    this.marker = L.marker([this.poi.lat, this.poi.lon], { icon: greenIcon }).addTo(this.map);

  }

  setMap() {
    const newLatLng = new L.LatLng(this.poi.lat, this.poi.lon);
    this.map.setView(newLatLng, 16);
    this.marker.setLatLng(newLatLng);
  }

  getGeoData(searchval: any) {
    this.apiService.getData(searchval).subscribe(
      (data) => {
        if (data) {
          this.geodata = data;
          this.poi.lat = this.geodata?.location?.lat;
          this.poi.lon = this.geodata?.location?.lng;
          this.setMap();
        }
      },
      (error) => {
        // console.error("API request failed:", error);
        Swal.fire({
          icon: 'error',
          text: `${error.statusText}`,
        })
      }
    );
  }


  ngOnInit() {
    this.getGeoData('');
  }
  ngAfterViewInit() {
    this.initMap();
  }

  getDirection(lat: any, lng: any) {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
    )
  }

}
