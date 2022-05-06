package com.example.flightticketbookingsystem.security;

import com.example.flightticketbookingsystem.filter.CustomAuthenticationFilter;
import com.example.flightticketbookingsystem.filter.CustomAuthorizationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration @EnableWebSecurity @RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private UserDetailsService userDetailsService;
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public SecurityConfig(UserDetailsService userDetailsService, BCryptPasswordEncoder passwordEncoder) {
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManagerBean());
        customAuthenticationFilter.setFilterProcessesUrl("/api/login/");

        http.cors().configurationSource(request -> {
            var cors = new CorsConfiguration();
            cors.setAllowedOrigins(List.of("http://localhost:3000/", "http://localhost:3001/", "http://localhost:3002/"));
            cors.setAllowedMethods(List.of("GET","POST", "PUT", "DELETE", "OPTIONS"));
            cors.setAllowedHeaders(List.of("*"));
            return cors;
        });
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(STATELESS);
        http.authorizeRequests().antMatchers(POST,"/api/login/**").permitAll();
        http.authorizeRequests().antMatchers(POST,"/api/login/?**").permitAll();
        http.authorizeRequests().antMatchers(POST,"/api/user/register/**").permitAll();
        http.authorizeRequests().antMatchers(GET,"/api/flight/search_flights/**").permitAll();
        http.authorizeRequests().antMatchers(GET,"/api/flight/get_flight/**").permitAll();
        http.authorizeRequests().antMatchers(GET,"/api/admin/**").hasAnyAuthority("ADMIN");
        http.authorizeRequests().antMatchers(GET,"/api/user/**").hasAnyAuthority("USER","ADMIN");
        http.authorizeRequests().antMatchers(GET,"/api/booking/**").hasAnyAuthority("USER","ADMIN");
        http.authorizeRequests().antMatchers(GET,"/api/location/**").hasAnyAuthority("ADMIN");
        http.authorizeRequests().antMatchers(GET,"/api/flight/**").hasAnyAuthority("ADMIN");
        http.authorizeRequests().antMatchers(GET,"/api/fleet/**").hasAnyAuthority("ADMIN");

        http.addFilter(customAuthenticationFilter);
        http.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
    }
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception{
        return super.authenticationManagerBean();
    }
}
