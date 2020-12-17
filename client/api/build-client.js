import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL: 'http://my-release-ingress-nginx-controller.default.svc.cluster.local',
      headers: req.headers
    });
  }
  else {
    return axios.create({});
  }
};